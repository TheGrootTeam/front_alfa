import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInfoApplicantAction } from '../../store/actions/infoApplicantActions';
import { AppDispatch } from '../../store/store';

export default function ApplicantInfo() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getInfoApplicantAction());
  }, [dispatch]);

  return (
    <>
      <p></p>
      <p></p>
    </>
  );
}
