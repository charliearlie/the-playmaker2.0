/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Alert, { AlertType } from '../alert';

describe('Alert', () => {
  it('should render correctly', () => {
    const message = 'Alert message';
    const title = 'Alert title';
    const { getByText } = render(
      <Alert message={message} title={title} type={AlertType.INFO} />,
    );

    expect(getByText(message)).toBeInTheDocument();
    expect(getByText(title)).toBeInTheDocument();
  });

  it('should render a red alert for error', () => {
    const message = 'Alert message';
    const title = 'Alert title';
    const { getByTestId } = render(
      <Alert message={message} title={title} type={AlertType.ERROR} />,
    );

    const alertComponent = getByTestId('alert-component');

    expect(alertComponent).toHaveClass('bg-red-100');
    expect(alertComponent).toHaveClass('border-red-400');
  });

  type alertComponentProps = {
    backgroundClass: string;
    borderClass: string;
    message: string;
    title: string;
    type: AlertType;
  };

  let alertTypes: alertComponentProps[] = [];
  for (const type in AlertType) {
    switch (type) {
      case 'ERROR':
        alertTypes.push({
          backgroundClass: 'bg-red-100',
          borderClass: 'border-red-400',
          message: 'Error alert',
          title: 'Error',
          type: AlertType.ERROR,
        });
      case 'WARN':
        alertTypes.push({
          backgroundClass: 'bg-yellow-200',
          borderClass: 'border-yellow-500',
          message: 'Error alert',
          title: 'Error',
          type: AlertType.WARN,
        });
      case 'INFO':
        alertTypes.push({
          backgroundClass: 'bg-blue-200',
          borderClass: 'border-blue-500',
          message: 'Error alert',
          title: 'Error',
          type: AlertType.INFO,
        });
    }
  }

  // todo: Fix the types for this for better naming
  it.each(alertTypes)(
    `$type should render the correct colours on its border and background`,
    ({ backgroundClass, borderClass, message, title, type }) => {
      const { getByTestId } = render(
        <Alert message={message} title={title} type={type} />,
      );

      const alertComponent = getByTestId('alert-component');

      expect(alertComponent).toHaveClass(backgroundClass);
      expect(alertComponent).toHaveClass(borderClass);
    },
  );
});
