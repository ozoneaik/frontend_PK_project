import Swal from "sweetalert2";



export const AlertSuccess = (title, text) => {
    Swal.fire({
        icon: "success",
        title: title,
        text: text,
        allowOutsideClick: false,
    }).then((result) => {
        console.log(result);
    })
}

export const AlertError = (title, text) => {
    Swal.fire({
        icon: "error",
        title: title,
        text: text,
        allowOutsideClick: false,
    }).then((result) => {
        console.log(result);
    })
}

export const AlertSuccessNavigate = (title, text, navigate, navigateUri) => {
    Swal.fire({
        icon: "success",
        title: title,
        text: text,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            navigate(navigateUri);
        }
    })
}