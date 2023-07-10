import { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

const Review = () => {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [fav, setFav] = useState(0)

    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    })

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue)
        setValue(newValue)
    }

    return (<div className="flex flex-col w-screen h-screen bg-[#1F1D36]">
        <div>
            <div>
                ? Write your review
            </div>
            <div>
                <h2>title</h2>
                <div className="w-1/2">
                    <Datepicker
                        useRange={false}
                        asSingle={true}
                        value={value}
                        onChange={handleValueChange}
                        displayFormat={"DD/MM/YYYY"} 
                                  />
                </div>
                <div className="flex">
                    <div className="flex">
                        {[...Array(5)].map((star, index) => {
                            index += 1;
                            return <svg key={index} onClick={() => setRating(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)} className={`w-6 h-6 ${index <= (hover || rating) ? "text-yellow-300" : "text-[#3D3B53]"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        })}
                    </div>

                    <svg onClick={() => setFav(!fav)} className={`w-6 h-6 ${fav ? "text-red-600" : "text-[#3D3B54]"} hover:text-red-600`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                    </svg>
                </div>
            </div>
            <div>image card</div>
        </div>
        <textarea placeholder="Write down your review..." className="block p-2.5 w-[335px] h-[410px] text-sm rounded-lg bg-[#3D3B53] border border-stone-300 border-stone-600 ext-white text-opacity-50 font-semibold focus:ring-blue-500 focus:border-blue-500">

        </textarea>

    </div >)
}

export default Review
