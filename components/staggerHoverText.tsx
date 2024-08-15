import classNames from "classnames";

export default function PerspectiveText({label, textColor}){
    return (
        <div className="w-full h-full justify-center items-center flex flex-col relative">
            <p className={classNames(textColor, "group-hover:tracking-widest text-left duration-500 ease-in-out")} >{label}</p>
            <div className="w-0 h-full bg-dark absolute group-hover:w-full duration-500 ease-in-out overflow-hidden">
                <p className="group-hover:tracking-widest text-left duration-500 ease-in-out text-light" >{label}</p>
            </div>
        </div>
    )
}