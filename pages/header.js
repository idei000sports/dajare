import '../app/globals.css'

export default function Header() {
    return (
        <>
            
            <div className="container">
                <div className="mx-auto flex p-5 flex-row items-center justify-between">
                    <div class="justify-start items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <img src="icon.svg" viewBox="0 0 24 24" className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full" />
                        <span className="flex ml-3 text-xl">機械</span>
                    </a>
                    </div>
                    <div className="justify-end flex space-x-4 items-center">
                        <nav className="text-base flex">
                            <a className="hover:text-gray-900">Link</a>
                        </nav>
                        <button className="flex bg-gray-100 border-0 pfocus:outline-none hover:bg-gray-200 rounded text-base">Button
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}