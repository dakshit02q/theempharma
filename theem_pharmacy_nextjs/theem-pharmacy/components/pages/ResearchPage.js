// Server Component for Research Page
export default function ResearchPage({ researchProjects, publications, facilities }) {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">Research & Innovation</h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        Advancing pharmaceutical sciences through cutting-edge research, innovation,
                        and collaborative partnerships with industry and academia.
                    </p>
                </div>
            </section>

            {/* Research Focus */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Research Focus</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Our research initiatives span across multiple domains of pharmaceutical sciences,
                            addressing critical healthcare challenges and advancing scientific knowledge.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-pills text-blue-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Drug Discovery</h3>
                            <p className="text-gray-600">Novel drug development and formulation research</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-leaf text-green-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Natural Products</h3>
                            <p className="text-gray-600">Herbal medicine and phytochemical studies</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-microscope text-purple-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Clinical Research</h3>
                            <p className="text-gray-600">Clinical trials and pharmaceutical care studies</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-dna text-orange-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Biotechnology</h3>
                            <p className="text-gray-600">Biopharmaceuticals and biotech applications</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Current Research Projects */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Current Research Projects</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Our ongoing research projects are funded by prestigious agencies and
                            address significant healthcare challenges.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {researchProjects.map((project) => (
                            <div key={project.id} className="bg-white rounded-2xl p-8 shadow-xl">
                                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center text-gray-600">
                                        <i className="fas fa-user-tie mr-2"></i>
                                        <span>PI: {project.principalInvestigator}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <i className="fas fa-calendar mr-2"></i>
                                        <span>{project.duration}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <i className="fas fa-university mr-2"></i>
                                        <span>{project.funding}</span>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                        {project.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Research Publications */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Recent Publications</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Our faculty and research scholars regularly publish in high-impact
                            peer-reviewed journals contributing to scientific knowledge.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {publications.map((publication) => (
                            <div key={publication.id} className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-600">
                                <div className="flex flex-col lg:flex-row justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">{publication.title}</h3>
                                        <p className="text-gray-600 mb-2">Authors: {publication.authors}</p>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                            <span><i className="fas fa-book mr-1"></i>{publication.journal}</span>
                                            <span><i className="fas fa-calendar mr-1"></i>{publication.year}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 lg:mt-0 flex flex-col items-end">
                                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                            IF: {publication.impactFactor}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Research Facilities */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Research Facilities</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            State-of-the-art research infrastructure supporting advanced
                            pharmaceutical research and innovation.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facilities.map((facility) => (
                            <div key={facility.id} className="bg-white rounded-2xl p-8 shadow-xl">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                    <i className={`${facility.icon} text-blue-600 text-2xl`}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4">{facility.name}</h3>
                                <p className="text-gray-600 mb-4">{facility.description}</p>
                                {facility.equipment && (
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        {facility.equipment.map((item, index) => (
                                            <li key={index}>• {item}</li>
                                        ))}
                                    </ul>
                                )}
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
                            Research data, publications, and project information are dynamically managed
                            through our administrative system for real-time updates.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
