"use client";

import React from "react";

const OauthRedirect = () => {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [token, setToken] = useState<string | null>(null);
  // const router = useRouter();
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     try {
  //       const code = searchParams.get("code");

  //       if (!code) {
  //         setError("Authorization code is missing.");
  //         setLoading(false);
  //         return;
  //       }

  //       const accessToken = await getAccessToken(code);

  //       setToken(accessToken);
  //       console.log(accessToken);
  //       console.log("Token:", token);
  //     } catch (error: any) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchToken();
  // }, [searchParams, router]);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl">Redirecting...</h1>{" "}
      </div>
    </div>
  );
};

export default OauthRedirect;
