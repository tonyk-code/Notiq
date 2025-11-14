
type TButton = {
  className: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({className, ...props}: TButton){
  return(
  <button {...props} className={`${className}`}> </button>
  )
}
