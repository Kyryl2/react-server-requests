import PetFormFormik from './Forms/Form-Formik';
import PetFormRHF from './Forms/Form-RHF';
import PetForm from './Forms/Form-Usuall';
import s from './App.module.css';
const App = () => {
  return (
    <div className={s.container}>
      <h1 className={s.header}> Usuall form</h1>
      <PetForm />
      <h1 className={s.header}> Formik form</h1>
      <PetFormFormik />
      <h1 className={s.header}> React-Hook-Form form</h1>
      <PetFormRHF />
    </div>
  );
};

export default App;
