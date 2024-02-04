import PageProvider from '@/context/PageContext/PageProvider';
import RegisterView from '@/views/RegisterView';

export default function Register(): React.JSX.Element {
  return (
    <PageProvider description="Pagina principal registro" props={null}>
      <RegisterView />
    </PageProvider>
  );
}
