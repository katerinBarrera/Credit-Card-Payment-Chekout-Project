export interface ITextField extends React.InputHTMLAttributes<HTMLInputElement> {
  alert?: { showAlert: boolean; message: string };
  value: string | number;
  type: string;
  label: string;
}
const InputComponent = ({ value, alert, type, label, ...rest }: ITextField) => {
  return (
    <div className='flex flex-col space-y-2 w-full'>
      <label
        className={`input inp-primary flex items-center font-medium text-[13px] ${alert?.showAlert && 'text-red-500'}`}>
        {label}
        <input
          className='px-2 w-auto font-normal text-gray-500'
          type={type}
          value={value}
          {...rest}
        />{' '}
      </label>
      {alert?.showAlert && <span className='text-red-500 text-xs'>{alert?.message}</span>}
    </div>
  );
};

export default InputComponent;
