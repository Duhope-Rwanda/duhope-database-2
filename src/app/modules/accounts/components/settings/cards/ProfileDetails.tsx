import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { toAbsoluteUrl } from '../../../../../../_powr/helpers';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase';
import { useAuth } from '../../../../auth';
import { UserProps } from '../../../../../types/app.type';
import { setUser } from '../../../../../redux/features/auth/authSlice';
import { IUpdateNames } from '../SettingsModel';

const profileDetailsSchema = Yup.object().shape({
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required')
});

const ProfileDetails: React.FC = () => {
	const [success, setSuccess] = useState(false);
	const { currentUser, setCurrentUser } = useAuth();

	const [data, setData] = useState<IUpdateNames>({
		firstName: currentUser?.firstName || '',
		lastName: currentUser?.lastName || ''
	});

	const updateData = (fieldsToUpdate: Partial<IUpdateNames>): void => {
		setData((prevData) => ({
			...prevData,
			...fieldsToUpdate
		}));
	};

	const dispatch = useDispatch();

	const handleSave = async () => {
		setLoading(true);
		try {
			await updateDoc(
				doc(db, 'users', currentUser?.uid as string),
				'firstName',
				data.firstName,
				'lastName',
				data.lastName
			);
			let user = (await getDoc(doc(db, 'users', currentUser?.uid as string))).data() as UserProps;
			setCurrentUser(user);
			setTimeout(() => {
				dispatch(setUser(user));
				setLoading(false);
				setSuccess(true);
			}, 3000);
		} catch (err: any) {
			console.error('Error updating profile: ', err);
			setLoading(false);
			setSuccess(false);
		}
	};

	const [loading, setLoading] = useState(false);
	const formik = useFormik<IUpdateNames>({
		initialValues: {
			firstName: currentUser?.firstName || '',
			lastName: currentUser?.lastName || ''
		},
		validationSchema: profileDetailsSchema,
		onSubmit: (values) => {
			setLoading(true);
			setTimeout(() => {
				const updatedData = Object.assign(data, values);
				setData(updatedData);
				setLoading(false);
			}, 1000);
		}
	});

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', 'xtaojmih');
			formData.append('cloud_name', 'des6kmdkj');

			try {
				const response = await axios.post(
					'https://api.cloudinary.com/v1_1/des6kmdkj/image/upload',
					formData
				);
				const newImageURL = response?.data?.secure_url;
				await updateDoc(doc(db, 'users', currentUser?.uid as string), 'photoURL', newImageURL);
				let user = (await getDoc(doc(db, 'users', currentUser?.uid as string))).data() as UserProps;
				setCurrentUser(user);
				dispatch(setUser(user));
			} catch (error) {
				console.error('Error uploading image: ', error);
			}
		}
	};

	return (
		<div className="card mb-5 mb-xl-10">
			<div
				className="card-header border-0 cursor-pointer"
				role="button"
				data-bs-toggle="collapse"
				data-bs-target="#kt_account_profile_details"
				aria-expanded="true"
				aria-controls="kt_account_profile_details"
			>
				<div className="card-title m-0">
					<h3 className="fw-bolder m-0">Profile Details</h3>
				</div>
			</div>

			<div id="kt_account_profile_details" className="collapse show">
				<form onSubmit={formik.handleSubmit} noValidate className="form">
					<div className="card-body border-top p-9">
						{success && (
							<div className="alert alert-success" role="alert">
								information updated successfully!
							</div>
						)}
						<div className="row mb-6">
							<label className="col-lg-4 col-form-label fw-bold fs-6">Avatar</label>
							<div className="col-lg-8">
								<div
									className="image-input image-input-outline"
									data-kt-image-input="true"
									style={{ backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})` }}
								></div>

								<img
									className="image-input-wrapper w-125px h-125px"
									src={currentUser?.photoURL || toAbsoluteUrl('/media/avatars/300-1.jpg')}
									alt="User Avatar"
								/>
							</div>
						</div>

						<div className="row mb-6">
							<label className="col-lg-4 col-form-label fw-bold fs-6">Avatar Upload</label>
							<div className="col-lg-8">
								<input
									type="file"
									accept="image/*"
									onChange={(e) => {
										handleImageChange(e);
									}}
								/>
							</div>
						</div>

						<div className="row mb-6">
							<label className="col-lg-4 col-form-label required fw-bold fs-6">Full Name</label>

							<div className="col-lg-8">
								<div className="row">
									<div className="col-lg-6 fv-row">
										<input
											type="text"
											className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
											placeholder="First name"
											value={data.firstName}
											onChange={(e) => updateData({ firstName: e.target.value })}
										/>
										{formik.touched.firstName && formik.errors.firstName && (
											<div className="fv-plugins-message-container">
												<div className="fv-help-block">{formik.errors.firstName}</div>
											</div>
										)}
									</div>

									<div className="col-lg-6 fv-row">
										<input
											type="text"
											className="form-control form-control-lg form-control-solid"
											placeholder="Last name"
											value={data.lastName}
											onChange={(e) => updateData({ lastName: e.target.value })}
										/>
										{formik.touched.lastName && formik.errors.lastName && (
											<div className="fv-plugins-message-container">
												<div className="fv-help-block">{formik.errors.lastName}</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className="row mb-6">
							<label className="col-lg-4 col-form-label required fw-bold fs-6">Email</label>
							<div className="col-lg-8 fv-row">
								<input
									type="text"
									className="form-control form-control-lg form-control-solid"
									placeholder="Email name"
									value={currentUser?.email as string}
								/>
							</div>
						</div>
					</div>
					<div className="card-footer d-flex justify-content-center py-6 px-9">
						<button
							type="submit"
							className="btn btn-primary"
							disabled={loading}
							onClick={() => handleSave()}
						>
							{!loading && 'Save Changes'}
							{loading && (
								<span className="indicator-progress" style={{ display: 'block' }}>
									Please wait...{' '}
									<span className="spinner-border spinner-border-sm align-middle ms-2"></span>
								</span>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export { ProfileDetails };
