import React, { useState, useEffect } from 'react';
import TableCard from './CardforAppointments';
import toast, { Toaster } from 'react-hot-toast';

function BookedAppointments() {
	const [Data, setData] = useState([]);
	const [isData, setIsData] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const email = localStorage.getItem('userEmail');

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

	const jwtToken = getJwtToken();

	useEffect(() => {
		if (!jwtToken) {
			toast.error('Session expired. Please login again.');
			return (window.location.href = '/user-login');
		}
		const fetchAppointments = async () => {
			try {
				const response = await fetch('http://localhost:6969/speaker/getAllSpeakers', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${jwtToken}`,
					},
				});
				if (!response.ok) {
					if (response.status === 404) return toast.error('No speakers found.');
					if (response.status === 500) return toast.error('Internal server error.');
				}
				const speakers = await response.json();
				const formattedData = speakers.map((speaker, index) => ({
					sr: index + 1,
					name: speaker.name,
					expertise: speaker.expertise,
					price: speaker.price,
					availability: speaker.availability, // Availability array with time slots
				}));
				setData(formattedData);
				setIsData(true);
			} catch (error) {
				console.error(error);
				toast.error('Internal server error');
			}
		};
		fetchAppointments();
		setLoading(false);
	}, [jwtToken]);

	const bookSession = async (speakerEmail, timeSlot) => {
		try {
			const response = await fetch('http://localhost:6969/appointment/bookSession', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwtToken}`,
				},
				body: JSON.stringify({
					userEmail: email,
					speakerEmail,
					timeSlot,
				}),
			});
			if (response.status === 200) {
				toast.success('Session booked successfully!');
			} else if (response.status === 400) {
				toast.error('Time slot already booked.');
			} else {
				toast.error('Error booking session.');
			}
		} catch (error) {
			console.error(error);
			toast.error('Internal server error');
		}
	};

	return (
		<>
			<Toaster />
			{isLoading ? (
				<div className='flex justify-center items-center h-screen'>Loading...</div>
			) : (
				<>
					{isData ? (
						<>
							<div className='flex flex-col overflow-x-auto'>
								<div className='sm:-mx-6 lg:-mx-8'>
									<div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
										<div className='overflow-x-auto'>
											<table className='min-w-full text-left text-sm font-light'>
												<thead className='border-b text-white text-base font-medium dark:border-neutral-500 bg-green-600'>
													<tr>
														<th scope='col' className='px-6 py-4'>
															#
														</th>
														<th scope='col' className='px-6 py-4'>
															Name
														</th>
														<th scope='col' className='px-6 py-4'>
															Expertise
														</th>
														<th scope='col' className='px-6 py-4'>
															Price
														</th>
														<th scope='col' className='px-6 py-4'>
															Availability
														</th>
														<th scope='col' className='px-6 py-4'>
															Action
														</th>
													</tr>
												</thead>
												<tbody>
													{Data.map((speaker, index) => (
														<tr key={index}>
															<td className='px-6 py-4'>{speaker.sr}</td>
															<td className='px-6 py-4'>{speaker.name}</td>
															<td className='px-6 py-4'>{speaker.expertise}</td>
															<td className='px-6 py-4'>${speaker.price}</td>
															<td className='px-6 py-4'>
																{speaker.availability.map((slot, i) => (
																	<span key={i} className='block'>
																		{slot}
																	</span>
																))}
															</td>
															<td className='px-6 py-4'>
																<select
																	className='border p-2'
																	onChange={(e) => bookSession(speaker.email, e.target.value)}
																>
																	<option value='' disabled selected>
																		Select Slot
																	</option>
																	{speaker.availability.map((slot, i) => (
																		<option key={i} value={slot}>
																			{slot}
																		</option>
																	))}
																</select>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</>
					) : (
						<div className='p-5 m-2 border-solid border-2 border-red-600 rounded-lg shadow-md bg-stone-100 hover:scale-105 transition-all m-auto'>
							<h4 className='text-lg font-bold text-center text-red-700'>No Speakers Available</h4>
						</div>
					)}
				</>
			)}
		</>
	);
}

export default BookedAppointments;
