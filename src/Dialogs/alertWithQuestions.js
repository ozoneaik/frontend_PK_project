import Swal from "sweetalert2";

export const AlertErrorWithQuestion = (title,text,textConfirm='ตกลง',textCancel='ยกเลิก',onPassed) => {
    Swal.fire({
        icon : "error",
        title,
        text,
        showCancelButton : true,
        confirmButtonText : textConfirm,
        cancelButtonText : textCancel,
        allowOutsideClick : false
    }).then((result) => {
        if(result.isConfirmed) {
            onPassed(true);
        }else{
            onPassed(false);
        }
    })
}