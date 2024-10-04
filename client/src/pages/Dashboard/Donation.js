import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout/Layout';
import API from '../../services/API';
import { useSelector } from 'react-redux';

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [donationData, setDonationData] = useState([]);
  const [certificateData, setCertificateData] = useState(null); // To hold certificate data

  // Fetch certificate image and data
  const getCertificate = async () => {
    try {
      const { data } = await API.get('/images');
      if (data?.success && data?.data.length > 0) {
        setCertificateData(data?.data[0]); // Assume the first image is used for the certificate
      } else {
        setCertificateData(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch donor records
  const getDoners = useCallback(async () => {
    try {
      const { data } = await API.post('/inventory/get-inventory-hospital', {
        filters: {
          inventoryType: "in",
          donar: user?._id,
        },
      });
      if (data?.success) {
        setDonationData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user?._id]);

  useEffect(() => {
    getDoners();
    getCertificate();
  }, [getDoners]);

  return (
    <Layout>
      <div className='container mt-4'>
        {donationData.length === 0 ? (
          <div className='alert alert-warning'>
            No donation records found.
          </div>
        ) : (
          <>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Blood Group</th>
                  <th scope='col'>Inventory Type</th>
                  <th scope='col'>Quantity</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Date</th>
                </tr>
              </thead>
              <tbody>
                {donationData.map((record) => (
                  <tr key={record?._id}>
                    <td>{record?.bloodGroup}</td>
                    <td>{record?.inventoryType}</td>
                    <td>{record?.quantity}</td>
                    <td>{record?.email}</td>
                    <td>{moment(record?.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Certificate Section */}
            {certificateData && (
              <div className="certificate-container">
                <div className="certificate-border" />
                <div className="certificate-header">Certificate of Appreciation</div>
                <div className="certificate-body">
                  This certificate is presented to
                </div>
                <div className="recipient-name">{certificateData?.name}</div> {/* Use name from the images table */}
                <div className="certificate-body">
                  In recognition of your outstanding dedication and contribution as a donor.<br />
                  Your generosity and support have saved lives and made a lasting impact.
                </div>
                <div className="award-title">Best Donor Award</div>
                <div className="date-signature">
                  <div className="date">Date: {moment(donationData[0]?.createdAt).format('DD/MM/YYYY')}</div>
                  <div className="signature">Signature: <img src="./assets/images/cocosign.png" alt="Signature"/></div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default Donation;
