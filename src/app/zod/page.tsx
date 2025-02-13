import EmailForm from './_components/EmailForm';
import LoginForm from './_components/LoginForm';
import NumberForm from './_components/NumberForm';
import TextForm from './_components/TextForm';

export default function Zod() {
  return (
    <div className="flex flex-col p-24 gap-24">
      <LoginForm />
      <EmailForm />
      <TextForm />
      <NumberForm />
    </div>
  );
}
