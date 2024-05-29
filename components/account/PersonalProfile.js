import Link from 'next/link';

const PersonalProfile = ({ texts, profile }) => {
    return (
        <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-800 text-lg">
                    {texts.personalProfile}
                </h3>
                <Link href="#" className="text-primary">
                    {texts.edit}
                </Link>
            </div>
            <div className="space-y-1">
                <h4 className="text-gray-700 font-medium">{profile?.name}</h4>
                <p className="text-gray-800">{profile?.email}</p>
                <p className="text-gray-800">{profile?.phone}</p>
            </div>
        </div>
    );
};

export default PersonalProfile;
