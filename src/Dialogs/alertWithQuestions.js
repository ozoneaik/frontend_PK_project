import Swal from "sweetalert2";

export const AlertErrorWithQuestion = (
    {
        title = 'สำเร็จ',
        text = '',
        textConfirm = 'ตกลง',
        textCancel = 'ยกเลิก',
        onPassed
    }) => {
    Swal.fire({
        icon: "error",
        title,
        text,
        showCancelButton: true,
        confirmButtonText: textConfirm,
        cancelButtonText: textCancel,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            onPassed(true);
        } else {
            onPassed(false);
        }
    })
}

export const AlertInfoWithQuestion = ({title, text, textConfirm = 'ตกลง', textCancel = 'ยกเลิก', onPassed}) => {
    Swal.fire({
        icon: "question",
        title,
        text,
        showCancelButton: true,
        confirmButtonText: textConfirm,
        cancelButtonText: textCancel,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            onPassed(true);
        } else {
            onPassed(false);
        }
    })
}

export const AlertSuccessWithQuestion = ({title, text = '', textConfirm = 'ตกลง', textCancel = 'ยกเลิก', onPassed}) => {
    Swal.fire({
        icon: "success",
        title,
        text,
        showCancelButton: true,
        confirmButtonText: textConfirm,
        cancelButtonText: textCancel,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            onPassed(true);
        } else {
            onPassed(false);
        }
    })
}