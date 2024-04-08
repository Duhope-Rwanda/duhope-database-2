import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { deleteWoman, fetchWomen, getWomanById } from '../../../redux/features/women/womenActions';
import { ProcessingLoader } from '../../../components/loaders/processingLoader'

const WomenDetails: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loadingWomen, selectedWomen } = useAppSelector((state) => state.women);
  const { womenId } = useParams();

  const handle_Women_delete = () => {
    if (womenId) dispatch(deleteWoman(womenId));
    dispatch(fetchWomen());
    navigate('/apps/Womens');
  }

  useEffect(() => {
    const fetchData = async () => {
      const Women = await dispatch(getWomanById(womenId as string));
      return Women;
    };

    fetchData();
  }, [dispatch, womenId]);

  return (
    <>
      {selectedWomen && (
        <>
          <div className="card mb-5 mb-xl-10">
            <div className="card-body pt-9 pb-0">
              <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                <div className="me-7 mb-4">
                  <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                    <img src={selectedWomen && selectedWomen.main_image_url} alt="Metronic" />
                    <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"></div>
                  </div>
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center mb-2">
                        <p className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1">
                          {selectedWomen.name}
                        </p>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <p className="text-gray-400 text-hover-primary  fw-bolder me-5">
                          {selectedWomen.description}
                        </p>
                      </div>

                      <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                        <p className="d-flex align-items-center text-gray-400 text-hover-primary me-1 mb-2">
                          {selectedWomen.category_id}
                        </p>
                      </div>
                    </div>

                    <div className="d-flex my-4">
                      <button
                        className="btn btn-sm btn-danger me-3"
                        onClick={handle_Women_delete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap flex-stack">
                    <div className="d-flex flex-column flex-grow-1 pe-8">
                      <div className="d-flex flex-wrap">
                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                          <div className="d-flex align-items-center">
                            <div className="fs-2 fw-bolder">{selectedWomen.price} $</div>
                          </div>

                          <div className="fw-bold fs-6 text-gray-400">Price</div>
                        </div>

                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                          <div className="d-flex align-items-center">
                            <div className="fs-2 fw-bolder">{selectedWomen.ratings}</div>
                          </div>

                          <div className="fw-bold fs-6 text-gray-400">Ratings</div>
                        </div>

                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                          <div className="d-flex align-items-center">
                            <div className="fs-2 fw-bolder">{selectedWomen.stock}</div>
                          </div>

                          <div className="fw-bold fs-6 text-gray-400">Available Stock</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex overflow-auto h-55px">
                <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
                  <li className="nav-item"></li>
                  <li className="nav-item"></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="d-flex gap-5">
            {selectedWomen.images.length > 0 &&
              selectedWomen.images.map((image, index) => (
                <div key={index} className="fv-row  justify-content-center mb-7">
                  <div
                    className="image-input image-input-outline"
                    data-kt-image-input="true"
                    style={{
                      backgroundImage: `url('${image}')`
                    }}
                  >
                    {/* begin::Preview existing avatar */}
                    <div
                      className="image-input-wrapper w-250px h-250px"
                      style={{
                        backgroundImage: `url('${image}')`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}

      {loadingWomen && <ProcessingLoader />}
    </>
  );
};

export default WomenDetails;
