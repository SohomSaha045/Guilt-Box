import Loader from "@/loader";

export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <div className="h-full  m-auto justify-center">
          <Loader></Loader>
        </div>
    )
  }