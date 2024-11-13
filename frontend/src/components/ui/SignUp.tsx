import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { SignupType } from "@akshitlakhera/common-zod-app";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { Loader } from "lucide-react";
import { useTheme } from "../theme-provider";

//firebase auth
import { auth } from "../firebase";
import { googleProvider } from "../firebase";
import {
    signInWithPopup,
    GithubAuthProvider,
    TwitterAuthProvider,
} from "firebase/auth";

export default function SignUp() {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupType>({
        email: "",
        password: "",
        name: "",
    });
    const [loading, setloading] = useState(false);
    const [signInStatus, setSignInStatus] = useState(""); // for firebase
    const [errorMessage, setErrorMessage] = useState("");
    const { theme, setTheme } = useTheme();
    // console.log(theme);
    if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";

        // console.log(systemTheme);
        setTheme(systemTheme);
    }
    const handleClose = () => {
        setErrorMessage("");
    };

    async function sendRequest() {
        setloading(true);
        // Password validation
        if (!validatePassword(postInputs.password)) {
            alert(
                "Password must be at least 8 characters long, contain a mix of uppercase and lowercase letters, numbers, and special characters (e.g., @, #, $)."
            );
            setloading(false);
            return; // Exit the function if validation fails
        }

        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/signup`,
                postInputs
            );
            // Sometimes this jwt format can give you lot of pain haha
            const jwt = "Bearer " + response.data.token;
            const userName = response.data.name; // Access user's name from response data
            localStorage.setItem("token", jwt);
            localStorage.setItem("name", userName);
            console.log(userName);
            console.log(jwt);
            navigate("/blogs");
        } catch (e) {
            setErrorMessage("Invalid Details ");
        } finally {
            setloading(false);
        }
        console.log(postInputs);
    }

    // Updated password validation function
    function validatePassword(password: string): boolean {
        const minLength = 8;
        const hasUppercase = /[A-Z]/; // At least one uppercase letter
        const hasLowercase = /[a-z]/; // At least one lowercase letter
        const hasNumber = /\d/; // At least one number
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character

        return (
            password.length >= minLength &&
            hasUppercase.test(password) &&
            hasLowercase.test(password) &&
            hasNumber.test(password) &&
            hasSpecialChar.test(password)
        );
    }

    const handleGoogleSignIn = async () => {
        console.log("Google sign-in button clicked"); // Debugging log
        try {
            await signInWithPopup(auth, googleProvider);
            setSignInStatus("Sign-in successful!");
            setErrorMessage("");

            navigate("/blogs");

            console.log("User signed in:");
        } catch (error) {
            setSignInStatus("Sign-in failed.");
            setErrorMessage("signin interrupted");
            console.error("Error signing in with Google:", error);
        }
    };

    // GitHub Sign-in
    const handleGitHubSignIn = () => {
        const githubProvider = new GithubAuthProvider();
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                console.log("GitHub sign-in successful:", result.user);
            })
            .catch((error) => {
                console.error("GitHub sign-in error:", error);
            });
    };

    // Twitter Sign-in
    const handleTwitterSignIn = () => {
        const twitterProvider = new TwitterAuthProvider();
        signInWithPopup(auth, twitterProvider)
            .then((result) => {
                console.log("Twitter sign-in successful:", result.user);
            })
            .catch((error) => {
                console.error("Twitter sign-in error:", error);
            });
    };

    const [reset, setReset] = React.useState(false);
    return (
        <main className="w-full min-h-screen flex overflow-y-hidden">
            <div className="relative flex-1 hidden items-center justify-center min-h-screen bg-transparent lg:flex">
                <div className="relative z-10 w-full max-w-lg">
                    <img
                        src="https://farmui.com/logo-dark.svg"
                        width={100}
                        className="rounded-full"
                    />
                    <div className=" mt-10 space-y-3">
                        <h3
                            className={`${theme === "light" ? "text-black" : "text-white"} text-3xl md:text-4xl lg:text-6xl font-normal font-geist tracking-tighter`}
                        >
                            PenCraft
                        </h3>

                        <p
                            className={`${theme === "light" ? "text-gray-800" : `text-gray-300`} text-md md:text-xl font-geist tracking-tight`}
                        >
                            Create an account and get access to all features ,
                            No credit card required.
                        </p>
                        <div className="flex items-center -space-x-2 overflow-hidden">
                            <img
                                src="https://randomuser.me/api/portraits/women/79.jpg"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                            <img
                                src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                            <img
                                src="https://randomuser.me/api/portraits/men/86.jpg"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                            <p
                                className={`${theme === "light" ? " text-gray-800" : "text-gray-400"} text-sm font-medium translate-x-5`}
                            >
                                Join 5.000+ users
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-0 my-auto h-full"
                    style={
                        {
                            // background: "linear- gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)", filter: "blur(118px)"
                        }
                    }
                >
                    <div
                        className={`absolute bg-transparent inset-0 opacity-15   w-full   bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]`}
                    ></div>

                    <img
                        className="absolute inset-x-0 -top-20 opacity-25 "
                        src={
                            "https://pipe.com/_next/image?url=%2Fassets%2Fimg%2Fhero-left.png&w=384&q=75"
                        }
                        width={1000}
                        height={1000}
                        alt="back bg"
                    />
                </div>
            </div>
            <div className="flex-1 relative flex items-center justify-center min-h-full">
                <img
                    className="absolute inset-x-0 -z-1 -top-20 opacity-75 "
                    src={
                        "https://pipe.com/_next/image?url=%2Fassets%2Fimg%2Fhero-left.png&w=384&q=75"
                    }
                    width={1000}
                    height={1000}
                    alt="back bg"
                />
                <div className="w-full max-w-md md:max-w-lg space-y-8 px-4   sm:px-0 z-20">
                    <div className="relative">
                        <img
                            src="https://farmui.com/logo.svg"
                            width={100}
                            className="lg:hidden rounded-full"
                        />
                        <div className="mt-5 space-y-2">
                            <h3
                                className={`${theme === `light` ? `text-gray-900` : `text-gray-200`} text-3xl  font-semibold tracking-tighter sm:text-4xl`}
                            >
                                Sign up
                            </h3>
                            <p
                                className={`${theme === `light` ? `text-gray-900` : `text-gray-400`}`}
                            >
                                Already have an account?{" "}
                                <Link
                                    to={"/signin"}
                                    className="font-medium text-indigo-800 hover:text-indigo-800"
                                >
                                    sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-3">
                        <button
                            onClick={handleGoogleSignIn}
                            className={`${theme === `light` ? `border-2 border-gray-800` : ""} group flex transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]  border-white/10  items-center justify-center py-5 border rounded-lg hover:bg-transparent/50 duration-150 active:bg-transparent/50`}
                        >
                            <svg
                                className={cn(
                                    "w-5 h-5 group-hover:-translate-y-1 duration-300 transition-all",
                                    reset
                                        ? "translate-y-0"
                                        : "tranistion-transform"
                                )}
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_17_40)">
                                    <path
                                        d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                                        fill="#FBBC04"
                                    />
                                    <path
                                        d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                                        fill="#EA4335"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_17_40">
                                        <rect
                                            width="48"
                                            height="48"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>

                        <button
                            onClick={handleTwitterSignIn}
                            className={`${theme === `light` ? `border-2 border-gray-800` : ""} group flex transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]  border-white/10  items-center justify-center py-5 border rounded-lg hover:bg-transparent/50 duration-150 active:bg-transparent/50`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                enable-background="new 0 0 72 72"
                                viewBox="0 0 72 72"
                                id="twitter-x"
                                fill="white"
                                className={cn(
                                    "w-5 h-5 group-hover:-translate-y-1 duration-300 transition-all ",
                                    reset
                                        ? "translate-y-0"
                                        : "tranistion-transform"
                                )}
                            >
                                <switch>
                                    <g>
                                        <path d="M42.5,31.2L66,6h-6L39.8,27.6L24,6H4l24.6,33.6L4,66h6l21.3-22.8L48,66h20L42.5,31.2z M12.9,10h8l38.1,52h-8L12.9,10z"></path>
                                    </g>
                                </switch>
                            </svg>
                        </button>
                        <button
                            onClick={handleGitHubSignIn}
                            className={`${theme === `light` ? `border-2 border-gray-800` : ""} group flex transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]  border-white/10  items-center justify-center py-5 border rounded-lg hover:bg-transparent/50 duration-150 active:bg-transparent/50`}
                        >
                            <svg
                                className={cn(
                                    "w-5 h-5 group-hover:-translate-y-1 duration-300 transition-all ",
                                    reset
                                        ? "translate-y-0"
                                        : "tranistion-transform"
                                )}
                                viewBox="0 0 48 48"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_910_21)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M24.0005 1C18.303 1.00296 12.7923 3.02092 8.45374 6.69305C4.11521 10.3652 1.23181 15.452 0.319089 21.044C-0.593628 26.636 0.523853 32.3684 3.47174 37.2164C6.41963 42.0643 11.0057 45.7115 16.4099 47.5059C17.6021 47.7272 18.0512 46.9883 18.0512 46.36C18.0512 45.7317 18.0273 43.91 18.0194 41.9184C11.3428 43.3608 9.93197 39.101 9.93197 39.101C8.84305 36.3349 7.26927 35.6078 7.26927 35.6078C5.09143 34.1299 7.43223 34.1576 7.43223 34.1576C9.84455 34.3275 11.1123 36.6194 11.1123 36.6194C13.2504 40.2667 16.7278 39.2116 18.0949 38.5952C18.3095 37.0501 18.9335 35.999 19.621 35.4023C14.2877 34.8017 8.68408 32.7548 8.68408 23.6108C8.65102 21.2394 9.53605 18.9461 11.156 17.2054C10.9096 16.6047 10.087 14.1785 11.3905 10.8829C11.3905 10.8829 13.4054 10.2427 17.9916 13.3289C21.9253 12.2592 26.0757 12.2592 30.0095 13.3289C34.5917 10.2427 36.6026 10.8829 36.6026 10.8829C37.9101 14.1706 37.0875 16.5968 36.8411 17.2054C38.4662 18.9464 39.353 21.2437 39.317 23.6187C39.317 32.7824 33.7015 34.8017 28.3602 35.3905C29.2186 36.1334 29.9856 37.5836 29.9856 39.8122C29.9856 43.0051 29.9578 45.5736 29.9578 46.36C29.9578 46.9962 30.391 47.7391 31.6071 47.5059C37.0119 45.7113 41.5984 42.0634 44.5462 37.2147C47.4941 32.3659 48.611 26.6326 47.6972 21.0401C46.7835 15.4476 43.8986 10.3607 39.5587 6.68921C35.2187 3.01771 29.7067 1.00108 24.0085 1H24.0005Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M9.08887 35.264C9.03721 35.3826 8.84645 35.4181 8.69146 35.3351C8.53646 35.2522 8.42122 35.098 8.47686 34.9755C8.5325 34.853 8.71928 34.8214 8.87428 34.9044C9.02927 34.9874 9.14848 35.1455 9.08887 35.264Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M10.0626 36.3428C9.98028 36.384 9.88612 36.3955 9.79622 36.3753C9.70632 36.3551 9.62629 36.3045 9.56979 36.2321C9.41479 36.0662 9.38298 35.837 9.50221 35.7342C9.62143 35.6315 9.83606 35.6789 9.99105 35.8449C10.146 36.0108 10.1818 36.24 10.0626 36.3428Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M11.0085 37.714C10.8614 37.8167 10.6111 37.714 10.472 37.5085C10.4335 37.4716 10.4029 37.4274 10.382 37.3785C10.3611 37.3297 10.3503 37.2771 10.3503 37.224C10.3503 37.1709 10.3611 37.1183 10.382 37.0694C10.4029 37.0205 10.4335 36.9763 10.472 36.9395C10.619 36.8407 10.8694 36.9395 11.0085 37.141C11.1476 37.3425 11.1516 37.6112 11.0085 37.714Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M12.2921 39.0417C12.161 39.1879 11.8947 39.1484 11.6761 38.9508C11.4575 38.7532 11.4059 38.4845 11.537 38.3423C11.6682 38.2 11.9344 38.2395 12.161 38.4331C12.3875 38.6268 12.4312 38.8994 12.2921 39.0417Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M14.0923 39.8162C14.0327 40.0019 13.7625 40.0849 13.4922 40.0059C13.222 39.9268 13.0432 39.7055 13.0948 39.5159C13.1465 39.3262 13.4207 39.2393 13.6949 39.3262C13.9691 39.4131 14.144 39.6226 14.0923 39.8162Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M16.0557 39.9505C16.0557 40.1442 15.8331 40.3101 15.547 40.3141C15.2608 40.318 15.0264 40.16 15.0264 39.9663C15.0264 39.7727 15.2489 39.6067 15.535 39.6028C15.8212 39.5988 16.0557 39.753 16.0557 39.9505Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M17.8838 39.6463C17.9196 39.8399 17.7208 40.0414 17.4347 40.0888C17.1486 40.1363 16.8982 40.0217 16.8624 39.832C16.8267 39.6423 17.0333 39.4368 17.3115 39.3855C17.5897 39.3341 17.848 39.4526 17.8838 39.6463Z"
                                        fill="currentColor"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_910_21">
                                        <rect
                                            width="48"
                                            height="48"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>

                    <form
                        noValidate
                        onSubmit={(e) => e.preventDefault()}
                        className="space-y-10 z-20"
                    >
                        {errorMessage && (
                            <div
                                className={`${theme === `light` ? `bg-gray-400` : "bg-zinc-700"} mt-2 flex items-center justify-between rounded-xl p-3 border-2 border-gray-900 -mb-4`}
                            >
                                <span className="text-red-500 font-semibold flex items-center gap-2 ">
                                    <IoIosWarning />
                                    {errorMessage}
                                </span>
                                <button
                                    className="text-red-500 font-semibold"
                                    onClick={handleClose}
                                >
                                    <RxCross2 />
                                </button>
                            </div>
                        )}

                        <div>
                            <label
                                className={`${theme === `light` ? `text-gray-800` : "text-gray-100/50"} font-medium  font-geist`}
                            >
                                Name
                            </label>
                            <Input
                                type="name"
                                required
                                placeholder="name"
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        name: e.target.value,
                                    });
                                }}
                                className={`${theme === `light` ? `text-gray-800 border-gray-800 border` : "text-white"}w-full mt-2 px-3 py-5  bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg `}
                            />
                        </div>
                        <div>
                            <label
                                className={`${theme === `light` ? `text-gray-800` : "text-gray-100/50"} font-medium  font-geist`}
                            >
                                Email
                            </label>
                            <Input
                                type="email"
                                required
                                placeholder="@email"
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        email: e.target.value,
                                    });
                                }}
                                className={`${theme === `light` ? `text-gray-800 border-gray-800 border` : "text-gray-500"}w-full mt-2 px-3 py-5  bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg `}
                            />
                        </div>
                        <div>
                            <label
                                className={`${theme === `light` ? `text-gray-800` : "text-gray-100/50"} font-medium  font-geist`}
                            >
                                Password
                            </label>
                            <Input
                                type="password"
                                required
                                placeholder="password"
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        password: e.target.value,
                                    });
                                }}
                                className={`${theme === `light` ? `text-gray-800 border-gray-800 border` : "text-gray-500"}w-full mt-2 px-3 py-5  bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg `}
                            />
                        </div>
                        <button
                            onClick={sendRequest}
                            className={`${theme === `light` ? `border-none` : "ring-offset-2 ring-offset-zinc-950"} w-full font-geist tracking-tighter text-center rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50  transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 flex items-center justify-center gap-2`}
                            disabled={loading}
                        >
                            Create Account
                            {loading === true && (
                                <div className="flex gap-3 justify-center items-center">
                                    <Loader />
                                </div>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
