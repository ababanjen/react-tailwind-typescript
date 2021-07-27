import { FC, useState } from "react";
import "./styles/output.css";

const product = {
  id: "product-001",
  name: "Audio-Technica ATH-MRS7",
  subName: "2017 Best Headphone of the Year Award Winner",
  price: "59.99",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  details:
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  currency: "$",
  originalPrice: "89.99",
  variant: [
    {
      id: "variant-1",
      color: "black",
      img: `${window.location.href}assets/ath-msr7-black.jpg`,
    },
    {
      id: "variant-2",
      color: "brown",
      img: `${window.location.href}assets/ath-msr7-brown.jpg`,
    },
  ],
};

const App: FC = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product.variant[0].id);

  const handleChangeTab = (tab) => setActiveTab(tab);
  const handleSelectVariant = ({ target: { value } }) =>
    setSelectedVariant(value);

  const getImage = () =>
    product.variant.find(({ id }) => id === selectedVariant)?.img || "";

  const handleAddtoCart = () => {
    if (!added) {
      setIsAdding(true);
      setTimeout(() => {
        alert("Item added to cart!");
        setIsAdding(false);
        setAdded(true);
      }, 2000);
    }
  };

  return (
    <div className="xs:min-w-full min-h-screen  xs:p-4 lg:min-w-0 lg:p-0  ">
      <div className="flex flex-col lg:mr-4 lg:ml-4 mt-8 mb-8">
        <div className="flex items-center cursor-pointer gap-2 text-gray-500 font-semibold">
          <ArrowIcon />
          All products
        </div>
      </div>
      <div className="flex xs:flex-col lg:flex-row lg:max-w-screen-lg lg:m-auto">
        <div className="flex flex-col gap-8 lg:w-full xs:w-full">
          <div className="flex flex-col gap w-full lg:ml-4 lg:mr-4">
            <span className="text-3xl font-bold">{product.name}</span>
            <span className="text-sm text-gray-500">{product.subName}</span>
          </div>
          <div className="flex w-full xs:flex-col lg:flex-row">
            <div className="flex flex-col w-full">
              <div className="flex w-full lg:ml-4 mr-4">
                {["description", "details"].map((tab) => (
                  <div
                    onClick={() => handleChangeTab(tab)}
                    key={tab}
                    className={`text-semibold font-semibold  pb-0  mr-4 flex uppercase justify-center p-4 cursor-pointer border-b-4  hover:border hover:border-solid hover:border-blue-400 ${
                      activeTab === tab
                        ? "border-blue-500"
                        : "border-white text-gray-400"
                    }`}
                  >
                    {tab}
                  </div>
                ))}
              </div>
              <div className="flex flex-col pt-4 pb-4 lg:border-b lg:border-t lg:border-gray-300">
                <div className="lg:ml-4 lg:mr-4 gap-6 flex flex-col">
                  <p>
                    {activeTab === "description"
                      ? product.description
                      : product.details}
                  </p>
                  <div className="flex font-bold gap-6">
                    <span className="text-lg">
                      {product.currency + product.price}
                    </span>
                    <span className="text-lg line-through text-gray-500">
                      {product.currency + product.originalPrice}
                    </span>
                  </div>
                  <select
                    value={selectedVariant.id}
                    className="xs:w-full lg:w-1/3 border border-solid border-gray-200 rounded p-2"
                    onChange={handleSelectVariant}
                  >
                    {product.variant.map(({ id, color }) => (
                      <option key={id} value={id}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex w-full xs:flex-col mt-8 lg:ml-4 box-border overflow-hidden">
                <div className="xs:w-auto p-4 xs:block lg:hidden">
                  <img className="w-full height-full" src={getImage()} alt="" />
                </div>
                <div className=" lg:w-auto xs:w-full">
                  <button
                    onClick={handleAddtoCart}
                    disabled={isAdding}
                    className={`uppercase text-sm p-2 pl-6 pr-6 xs:w-full lg:w-auto text-white font-semibold rounded ${
                      isAdding
                        ? "cursor-not-allowed bg-blue-300"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    <div className="relative flex justify-center items-center">
                      {isAdding && (
                        <span className="flex h-3 w-3 absolute">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                        </span>
                      )}
                      {added ? "View Cart" : "Add to Cart"}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-h-screen lg:border-l border-gray-300 items-start xs:hidden lg:block">
          <div className="xs:w-auto p-4 lg:w-80">
            <img className="w-full height-full" src={getImage()} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ArrowIcon: FC = () => (
  <svg
    id="Layer"
    enableBackground="new 0 0 64 64"
    fill="gray"
    height="20"
    viewBox="0 0 64 64"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m54 30h-39.899l15.278-14.552c.8-.762.831-2.028.069-2.828-.761-.799-2.027-.831-2.828-.069l-17.448 16.62c-.755.756-1.172 1.76-1.172 2.829 0 1.068.417 2.073 1.207 2.862l17.414 16.586c.387.369.883.552 1.379.552.528 0 1.056-.208 1.449-.621.762-.8.731-2.065-.069-2.827l-15.342-14.552h39.962c1.104 0 2-.896 2-2s-.896-2-2-2z" />
  </svg>
);

export default App;
