'use client';
import { useState } from 'react';
import { calculate, defaults, type Calculator } from '@/lib/calculators/engine';
import { getCalculatorContent } from '@/lib/calculators/content';
import styles from './Calculators.module.css';

export function CalculatorForm({calculator, locale}: {calculator: Calculator; locale: string}) {
  const content = getCalculatorContent(locale);
  const ui = content.ui;
  const copy = content.calculators[calculator.slug];
  const [values, setValues] = useState(() => defaults(calculator));
  const result = calculate(calculator, values);
  const format = new Intl.NumberFormat(locale, {maximumFractionDigits: 2});
  return <section className={styles.workspace} aria-label={copy.title}>
    <div className={styles.inputPanel}>
      <span className={styles.eyebrow}>01 / {ui.inputs}</span>
      <p>{copy.instructions}</p>
      <p className={styles.small}>{ui.example}</p>
      <form onSubmit={event => event.preventDefault()} noValidate>
        <div className={styles.fields}>{calculator.fields.map(field => {
          const value = Number(values[field.key]);
          const invalid = values[field.key].trim() === '' || !Number.isFinite(value) || value < field.min || value > field.max || (field.integer && !Number.isInteger(value)) || (field.key === 'deep' && value < Number(values.shallow));
          const override = 'fieldOverrides' in copy ? copy.fieldOverrides as Record<string,string> : {};
          return <div className={styles.field} key={field.key}>
            <label htmlFor={`calc-${field.key}`}>{override[field.key] ?? content.fields[field.key as keyof typeof content.fields]} {field.unit && <span>({field.unit})</span>}</label>
            <input id={`calc-${field.key}`} type="number" inputMode="decimal" min={field.min} max={field.max} step={field.integer ? '1' : 'any'} value={values[field.key]} aria-invalid={invalid} aria-describedby={`hint-${field.key}${invalid ? ' calculator-error' : ''}`} onChange={event => setValues(old => ({...old,[field.key]:event.target.value}))} />
            <small id={`hint-${field.key}`}>{ui.range}: {format.format(field.min)}–{format.format(field.max)}</small>
          </div>;
        })}</div>
        {!result && <p id="calculator-error" role="alert" className={styles.error}>{ui.invalid}</p>}
        <button type="button" className="btn btn-ghost" onClick={() => setValues(defaults(calculator))}>{ui.reset}</button>
      </form>
      <noscript><p>{ui.noscript}</p></noscript>
    </div>
    <div className={styles.resultPanel}>
      <span className={styles.eyebrow}>02 / {ui.results}</span>
      <p className={styles.small}>{ui.live}</p>
      <div aria-live="polite" aria-atomic="true" className={styles.outputs}>{copy.resultLabels.map((label,index) => <div key={label} className={index === 0 ? styles.primaryResult : styles.secondaryResult}>
        <output>{result ? format.format(result[index]) : '—'}</output><span>{label}</span>
      </div>)}</div>
      <div className={styles.gauge} aria-hidden="true"><span /><span /><span /><span /><span /></div>
      <p className={styles.small}>{ui.estimate} · {ui.units}</p>
      <p>{copy.caveat}</p>
    </div>
  </section>;
}
