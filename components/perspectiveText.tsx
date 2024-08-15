import classNames from "classnames";

export default function StaggerHoverText({label, textColor}){
    return (
        <div className="w-full h-full justify-center items-center flex group-hover:rotate-x-90 [transition:transform_0.50s_cubic-bezier(0.76,_0,_0.24,_1)] transform-style-3d">
            <p className={classNames(textColor, "[transition:all_0.50s_cubic-bezier(0.76,_0,_0.24,_1)] group-hover:-translate-y-full opacity-100 group-hover:opacity-0")} >{label}</p>
            <p className={classNames(textColor, "absolute opacity-0 group-hover:opacity-100 [transform:rotateX(-90deg)_translateY(50%)] [transition:all_0.50s_cubic-bezier(0.76,_0,_0.24,_1)] origin-[bottom_center]")}>{label}</p>
        </div>
    )
}