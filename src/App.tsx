import config from "./config/config";

function App() {
  console.log(config.appwriteUrl);
  return (
    <>
      <div className="text-4xl">BlogLyf</div>
    </>
  );
}

export default App;
