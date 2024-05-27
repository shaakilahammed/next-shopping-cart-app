const CheckoutForm = ({ texts }) => {
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="full-name" className="text-gray-600">
                    {texts.fullName} <span className="text-primary">*</span>
                </label>
                <input
                    type="text"
                    name="full-name"
                    id="full-name"
                    className="input-box"
                />
            </div>
            <div>
                <label htmlFor="phone" className="text-gray-600">
                    {texts.phoneNumber}
                </label>
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="input-box"
                />
            </div>
            <div>
                <label htmlFor="email" className="text-gray-600">
                    {texts.emailAddress}
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="input-box"
                />
            </div>
            <div>
                <label htmlFor="address" className="text-gray-600">
                    {texts.streetAddress}
                </label>
                <input
                    type="text"
                    name="address"
                    id="address"
                    className="input-box"
                />
            </div>

            <div>
                <label htmlFor="city" className="text-gray-600">
                    {texts.city}
                </label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    className="input-box"
                />
            </div>

            <div>
                <label htmlFor="region" className="text-gray-600">
                    {texts.country}
                </label>
                <input
                    type="text"
                    name="region"
                    id="region"
                    className="input-box"
                />
            </div>
        </div>
    );
};

export default CheckoutForm;
