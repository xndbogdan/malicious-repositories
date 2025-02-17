import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const fetchUserData = async (uid: any) => {
  let setUserData:any[] = [];
  if (uid !== null) {
      const qry = query(collection(db, "users"), where("uid", "in", uid));
      const ref = await getDocs(qry);
      ref.forEach((doc) => {
          const data = doc.data()
          setUserData.push(data);
      });
  }
  return setUserData;
}

export default fetchUserData;