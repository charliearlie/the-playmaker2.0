export enum AlertType {
  ERROR = 'error',
  INFO = 'info',
  WARN = 'warn',
}

const classes = {
  [AlertType.ERROR]: {
    background: 'bg-red-100',
    border: 'border-red-400',
    text: 'text-red-700',
  },
  [AlertType.INFO]: {
    background: 'bg-violet-200',
    border: 'border-violet-500',
    text: 'text-violet-800',
  },
  [AlertType.WARN]: {
    background: 'bg-yellow-200',
    border: 'border-yellow-500',
    text: 'text-yellow-900',
  },
};

type Props = {
  message: string;
  title?: string;
  type: AlertType;
};

export default function Alert({
  message,
  title,
  type = AlertType.INFO,
}: Props) {
  const { background, border, text } = classes[type];
  return (
    <div
      className={`relative mb-4 w-full max-w-sm rounded border ${background} ${border} ${text} px-8 py-3`}
      role="alert"
      data-testid="alert-component"
    >
      {title && <strong className="font-bold">{title}</strong>}
      <span className="block font-bold sm:inline">{message}</span>
      <button className="absolute bottom-0 right-0 top-0 px-3 pb-3 pt-0">
        <svg
          className={`h-6 w-6 fill-current ${text}`}
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </button>
    </div>
  );
}
