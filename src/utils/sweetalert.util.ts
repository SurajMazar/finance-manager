import Swal from 'sweetalert2';


export const Toast = (position:any,message:string,success:boolean)=>{
  const T = Swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  T.fire({
    icon: success?'success':'error',
    title: message
  })
}
