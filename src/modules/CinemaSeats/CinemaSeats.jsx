
import React, { Component } from 'react'
import './style.css'
import { connect } from 'react-redux'
import { CHON_VE, DAT_VE } from './CinemaSeatsType';

class CinemaSeats extends Component {

	render() {
		const { data, chonVe, datVe } = this.props;

		var dangChon = 0;
		var daDat = 0;
		var tongTienVe = 0;
		var tongSoVe = 0;

		for (let i = 0; i < data.slice(1).length; i++) {
			let ds = data.slice(1)[i].danhSachGhe
			for (let j = 0; j < ds.length; j++) {
				tongSoVe += 1;
				if (ds[j].daDat) {
					if (ds[j].gia === 0) {
						daDat += 1;
					} else {
						dangChon += 1;
						tongTienVe += ds[j].gia;
					}
				}
			}
		}

		var chuaDat = tongSoVe - dangChon - daDat;


		return (
			<div className='bookingMovie'>
				<div className="row">
					<div className="col-9 text-center filter">
						<h2 className='text-center' style={{ color: 'orange' }}>ĐẶT VÉ XEM PHIM</h2>
						<p className='text-white'>Màn Hình</p>

						<div className="screen">
							<table className="table">
								<thead>
									<tr>
										<th className='rowNumber'></th>
										{data[0].danhSachGhe.map((item, index) =>
											<th key={index} scope="col" className='rowNumber'>{item.soGhe}</th>
										)}
									</tr>
								</thead>
								<tbody>
									{data.slice(1).map((item, index) =>
										<tr key={index}>
											<th scope="row" className='firstChar tr'>{item.hang}</th>
											{item.danhSachGhe.map((itemCol, indexCol) =>
												<td className='tr' key={indexCol}>
													<button
														className={
															itemCol.gia !== 0 ?
																`${!itemCol.daDat ? 'ghe' : 'gheDangChon'}` : 'gheDuocChon'
														}
														onClick={() => { chonVe(index, indexCol, false) }}
													>{itemCol.soGhe}</button>
												</td>
											)}
										</tr>
									)}
								</tbody>
							</table>

						</div>
					</div>

					<div className="col-3 text-white text-left filter">
						<h2 className='text-center '>
							<span>DANH SÁCH GHẾ BẠN CHỌN</span>
						</h2>
						<div>
							<button className="gheDuocChon" disabled>{daDat}</button>
							<span> Ghế đã đặt</span>
						</div>
						<div className='my-3'>
							<button className="gheDangChon">{dangChon}</button>
							<span> Ghế đang chọn</span>
						</div>
						<div>
							<button className="gheChuaChon">{chuaDat}</button>
							<span> Ghế chưa đặt</span>
						</div>
						<table className='table mt-5 text-white text-center table-bordered'>
							<thead>
								<tr>
									<th>Số ghế</th>
									<th>Giá</th>
									<th>Hủy</th>
								</tr>
							</thead>
							<tbody>
								{data.slice(1).map((item, index) =>
									item.danhSachGhe.map((itemCol, indexCol) =>
										(itemCol.gia !== 0 && itemCol.daDat) &&
										<tr key={indexCol}>
											<td>
												{itemCol.soGhe}
											</td>
											<td>
												{itemCol.gia.toLocaleString() + ' VNĐ'} 
											</td>
											<td>
												<button className='cancel' onClick={() => chonVe(index, indexCol, true)}>X</button>
											</td>
										</tr>

									)
								)}
								<tr>
									<td>
										Số lượng vé: {dangChon}
									</td>
									<td colSpan="2">
										Tổng tiền: {(tongTienVe).toLocaleString() + ' VNĐ'} 
									</td>
								</tr>
							</tbody>
						</table>

						<button className='btn btn-success' onClick={() => datVe()}>Đặt vé</button>
					</div>
				</div>
			</div >
		)
	}
}

const mapStateToProps = (rootReducer) => {
	return {
		data: rootReducer.CinemaSeatsReducer,
	}
}

const mapDisPacthToProps = (dispatch) => {
	return {
		chonVe: (i, iCol, text) => {
			const action = {
				type: CHON_VE,
				payload: {
					i,
					iCol,
					text
				},
			};
			dispatch(action);
		},
		datVe: () => {
			const action = {
				type: DAT_VE,
			};
			dispatch(action);
		}
	};
};

export default connect(mapStateToProps, mapDisPacthToProps)(CinemaSeats)
