import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEducation } from '../../redux/actions/profile';
import formatDate from '../../utils/formaDate';

const Education = ({ education }) => {
  const dispatch = useDispatch()
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now'}
      </td>
      <td>
        <button
         onClick={()=>dispatch(deleteEducation(edu._id))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th >Degree</th>
            <th >Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};
export default Education