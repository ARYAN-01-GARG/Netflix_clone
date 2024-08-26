

function Input(prop) {
  return (
    <div className="w-full relative">
      <input 
        id={prop.label}
        value={prop.value}
        onChange={(e) => prop.setValue(e.target.value)}
        type={prop.type}
        placeholder=" "
        className="
            peer
            w-full
            bg-neutral-900/80
            text-white 
            border 
            border-gray-500 
            rounded-md
            pt-6
            pb-1
            text-lg 
            pl-5" 
      />
      <label
        htmlFor={prop.label}
        className="
        text-white/70 
        text-lg
        absolute
        duration-150
        transform
        -translate-y-3
        top-3
        left-5
        z-10
        origin-[0]
        peer-placeholder-shown:scale-110
        peer-placeholder-shown:translate-y-1
        peer-focus:scale-75
        peer-focus:top-3
        peer-focus:-translate-y-4
        ">
        {prop.label}
      </label>
    </div>
    
  )
}

export default Input
