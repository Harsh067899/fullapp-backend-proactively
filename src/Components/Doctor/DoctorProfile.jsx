import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorProfile = () => {
	const navigator = useNavigate();
	const email = localStorage.getItem('userEmail');
	const [doctor, setDoctor] = useState({});

	function getJwtToken() {
		const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
		for (const cookie of cookies) {
			const [name, value] = cookie.split('=');
			if (name === 'jwtToken') {
				return value;
			}
		}
		return null;
	}

	const authFetch = async (url, options = {}) => {
		const token = getJwtToken();

		const headers = {
			'Content-Type': 'application/json',
		};

		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		if (options.headers) {
			Object.assign(headers, options.headers);
		}

		return await fetch(url, {
			...options,
			headers: headers,
		});
	};

	useEffect(() => {
		const token = getJwtToken();
		if (!token) {
			alert('Access denied. Please login first!');
			navigator('/doctor-login');
		}

		const fetchDoctor = async () => {
			try {
				const response = await authFetch('http://localhost:6969/doctor/getByEmail', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email }),
				});
				if (response.status === 404) setDoctor({});
				if (response.status === 500) alert('Internal server error');
				const data = await response.json();
				return setDoctor(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchDoctor();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [email]);

	const handleEdit = () => {
		navigator('/update-profile');
	};

	return (
		<>
			<div className='min-h-dvh min-w-80  bg-white shadow overflow-hidden sm:rounded-lg'>
				<div className='px-4 py-5 sm:px-6'>
					<h3 className='text-lg leading-6 font-medium text-gray-900'>Speaker Information</h3>
					<p className='mt-1 max-w-2xl text-sm text-gray-500'>Your personal details.</p>
				</div>
				<div className='border-t border-gray-200'>
					<dl>
						<div className='bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Name</dt>
							<dd className='text-sm text-gray-900 sm:col-span-2'>{doctor.name}</dd>
						</div>
						<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Email address</dt>
							<dd className='text-sm text-gray-900 sm:col-span-2'>{doctor.email}</dd>
						</div>
						<div className='bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Specialisation</dt>
							<dd className='text-sm text-gray-900 sm:col-span-2'>{doctor.specialisation}</dd>
						</div>
						<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Certification</dt>
							<dd className='text-sm text-gray-900 sm:col-span-2'>{doctor.certification}</dd>
						</div>
						<div className='bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Speaker Id</dt>
							<dd className='text-sm text-gray-900 sm:col-span-2'>{doctor.clinic}</dd>
						</div>
						<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Working Hours</dt>
							<dd>
								{doctor.workingHours &&
									doctor.workingHours.map((day, index) =>
										day.from === '' || day.to === '' ? null : (
											<dd key={index} className='mt-1 text-sm text-gray-900 sm:col-span-2'>
												{day.day} : {day.from} - {day.to}
											</dd>
										)
									)}
							</dd>
						</div>
						<div className='bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Location</dt>
							<dd className='text-sm text-gray-900 sm:col-span-2'>{doctor.location}</dd>
						</div>
					</dl>
				</div>
				<button className='m-8 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' onClick={handleEdit}>
					Edit Profile
				</button>
			</div>
		</>
	);
};

export default DoctorProfile;
