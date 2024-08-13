export const ProductsError = ({productNotFound}) => {
    return (
        <>
            <div className={'card mt-3'}>
                <div className={'card-body'}>
                    <span>รายการสินค้า QC ที่ไม่พบในข้อมูลสินค้า QC ( Master )</span>
                    <div>
                        {
                            productNotFound.length > 0 ? (
                                productNotFound.map((item,i) => (
                                    <span key={i} className="badge badge-danger mr-1">รหัส {item.skucode}</span>
                                ))
                                ) : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}