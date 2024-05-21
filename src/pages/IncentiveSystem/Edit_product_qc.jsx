import Content from "../../layouts/Content.jsx";

function Edit_product_qc() {
    return (
        <Content header={'ข้อมูลสินค้า QC'} header_sub={'แก้ไขสินค้า'}>
            <div className={'card'}>
                <div className={'card-body'}>
                    <div className={'image preview'}>
                        <h6 className={'text-bold'}>รูปสินค้า</h6>
                        <img src="https://images.dcpumpkin.com/images/product/500/50175.jpg" alt="image"
                             style={{maxWidth: 'calc(100% - 100px)'}}/>
                    </div>
                    <div className={'row'}>
                        <div className={'col-md-6 col-sm-12'}>
                            <div className={'form-group'}>
                                <label htmlFor="product_code">รหัสสินค้า * </label>
                                <input type="text" readOnly={true} className={'form-control border-0 bg-light'}
                                       id={'product_code'}
                                       value={'50175'} name={'product_code'}/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="product_level">ระดับความยาก * </label>
                                <select name="product_level" id="product_level" className={'form-control select2'}>
                                    <option value="Very Easy">Very Easy</option>
                                    <option value="Easy">Easy</option>
                                    <option value="Middling">Middling</option>
                                    <option value="Hard">Hard</option>
                                    <option value="Very Hard">Very Hard</option>
                                </select>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="">วันที่สร้างและเวลาสร้าง</label>
                                <input type="text" readOnly={true} className={'form-control border-0 bg-light'}
                                       id={'product_code'}
                                       value={'02/05/2024 16:45:21'} name={'product_code'}/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="">วันที่-เวลา อัพเดท</label>
                                <input type="text" readOnly={true} className={'form-control border-0 bg-light'}
                                       id={'product_code'}
                                       value={'02/05/2024 16:45:21'} name={'product_code'}/>
                            </div>
                        </div>
                        <div className={'col-md-6 col-sm-12'}>
                            <div className={'form-group'}>
                                <label htmlFor="product_code">ชื่อสินค้า * </label>
                                <input type="text" className={'form-control border-0 bg-light'} id={'product_code'}
                                       value={'J-Series เจียรมือ4" J-G9612 (เครื่อง)'} name={'product_code'}/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="product_code">ระยะเวลามาตรฐาน (HH:MM:SS)</label>
                                <input type="text" className={'form-control'} id={'product_code'}
                                       value={'00.04.00'} name={'product_code'}/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="">ชื่อผู้สร้าง</label>
                                <input type="text" readOnly={true} className={'form-control border-0 bg-light'}
                                       id={'product_code'}
                                       value={'นายโรเบริต สายควัน'} name={'product_code'}/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="">ชื่อผู้อัพเดท</label>
                                <input type="text" readOnly={true} className={'form-control border-0 bg-light'}
                                       id={'product_code'}
                                       value={'นายโรเบริต สายควัน'} name={'product_code'}/>
                            </div>
                        </div>
                    </div>
                    <div className={'d-flex justify-content-center w-100'}>
                        <button className={'btn btn-primary'}>บันทึก</button>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default Edit_product_qc;