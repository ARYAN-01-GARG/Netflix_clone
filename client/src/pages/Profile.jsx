import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="bg-black w-full h-full flex flex-col justify-center items-center gap-10">
        <div className="text-white text-3xl md:text-5xl ">
            Who is Watching?
        </div>
        <div className="flex flex-row flex-wrap ">
            <div>
                <Link to={'/'} className="flex flex-col gap-2 group">
                    <img src="/Images/profile-blue.jpg" alt="Profile" className="w-28 h-28 rounded-md group-hover:w-32 group-hover:h-32  group-hover:duration-150 group-hover:transform group-hover:-translate-y-2 group-hover:border-4 border-white group-hover:rounded-lg"/>
                    <div className="text-white text-lg text-center group-hover:text-xl group-hover:font-semibold">
                        User 1
                    </div>
                </Link>
            </div>

        </div>
    </div>
  )
}

export default Profile;