import Bills from '../Components/Bills.js';
import { useParams } from 'react-router-dom';
import ShowBill from '../Components/ShowBill.js';

export default function Blog() {

    const params = useParams();
    const login = params.login;
    const billId = params.bill;

  return (
    <div>
        { billId ? (
          <ShowBill id={billId} view='blog' user={login} />
        ) : (
          <Bills user={login} />
        )}
    </div>
  );
}
