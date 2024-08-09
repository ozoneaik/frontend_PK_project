import {useEffect, useState} from "react";
import {ErrorProductsApi} from "../api/ErrorProducts.js";

export const ProductsError = ({year,month}) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        ErrorProductsApi(year,month).then(({data,status})=> {
            console.log(data,status)
            setList(data.list);
        })
    }, []);
    return (
        <>
            <div className={'card mt-3'}>
                <div className={'card-body'}>
                    <span>รายการสินค้า QC ที่ไม่พบในข้อมูลสินค้า QC ( Master )</span>
                    <div>
                        {
                            list.map((item,i) => (
                                <span key={i} className="badge badge-danger mr-1">รหัส {item.skucode}</span>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}