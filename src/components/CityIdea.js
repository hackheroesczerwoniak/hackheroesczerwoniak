export const CityIdea = (props) => {
    return<div className="w-[400px] bg-black/20 rounded-lg flex flex-col justify-center gap-4 p-4 mt-4">
            <div className="text-white text-2xl">{props.idea.title}</div>
        <div className="text-white text-sm font-normal">{props.idea.description}</div>
            <div className="text-white/70 text-sm font-normal">{props.idea.author}</div>
        </div>
}