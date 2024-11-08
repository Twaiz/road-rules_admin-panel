import style from './Checkbox.module.scss';

interface ICheckbox {
  label: string;
  onToggle?: () => void;
  defaultChecked?: boolean;
}

const Checkbox = (props: ICheckbox) => {
  const { label, onToggle, defaultChecked = false } = props;

  return (
    <div className={style.checkbox}>
      <label className={style.wrapper}>
        <input
          type="checkbox"
          onChange={onToggle}
          className={style.checkbox_inputCheckBox}
          defaultChecked={defaultChecked}
        />
        <span className={style.checkbox_inputCheckBoxCustom} />
        <span className={style.checkbox_label}>{label}</span>
      </label>
    </div>
  );
};

export { Checkbox };
