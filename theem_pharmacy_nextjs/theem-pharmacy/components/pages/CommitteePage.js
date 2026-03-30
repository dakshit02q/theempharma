import Image from 'next/image'

// Server Component for Committee Page
export default function CommitteePage({ committeeMembers }) {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">Committee & Governance</h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        Meet our distinguished committee members who guide our institution
                        towards excellence in pharmaceutical education and research.
                    </p>
                </div>
            </section>

            {/* Governance Structure */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Governance Structure</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Our committee comprises experienced professionals dedicated to maintaining
                            the highest standards in pharmaceutical education and administration.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-user-tie text-blue-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Leadership</h3>
                            <p className="text-gray-600">Strategic direction and governance oversight</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-graduation-cap text-green-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Academic Excellence</h3>
                            <p className="text-gray-600">Curriculum development and quality assurance</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-flask text-purple-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Research Innovation</h3>
                            <p className="text-gray-600">Promoting research and innovation culture</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-handshake text-orange-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Industry Relations</h3>
                            <p className="text-gray-600">Building strong industry partnerships</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Committee Members */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Committee Members</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Distinguished professionals with extensive experience in pharmaceutical
                            sciences, education, and industry leadership.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {committeeMembers.map((member) => (
                            <div
                                key={member.id}
                                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                                            <Image
                                                src={member.image || '/images/placeholder-avatar.jpg'}
                                                alt={member.name}
                                                width={128}
                                                height={128}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                                        <p className="text-blue-600 font-semibold text-lg mb-2">{member.position}</p>
                                        <p className="text-gray-600 mb-4">{member.department}</p>
                                        <p className="text-gray-700 mb-6">{member.bio}</p>

                                        <div className="space-y-2">
                                            <div className="flex items-center text-gray-600">
                                                <i className="fas fa-envelope w-5 mr-3"></i>
                                                <a href={`mailto:${member.email}`} className="hover:text-blue-600">
                                                    {member.email}
                                                </a>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <i className="fas fa-phone w-5 mr-3"></i>
                                                <a href={`tel:${member.phone}`} className="hover:text-blue-600">
                                                    {member.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Admin Panel Notice */}
            <section className="py-20 bg-blue-600 text-white">
                <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                        <h3 className="text-2xl font-bold mb-4">Connected to Admin Panel</h3>
                        <p className="text-xl opacity-90">
                            Committee information is managed through our administrative system.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
