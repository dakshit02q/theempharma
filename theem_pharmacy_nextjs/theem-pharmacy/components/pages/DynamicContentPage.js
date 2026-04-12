export default function DynamicContentPage({ title, subtitle, sections }) {
    return (
        <main className="bg-white min-h-screen">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="mb-8 lg:mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{title}</h1>
                    {subtitle ? <p className="mt-3 text-gray-600 text-base lg:text-lg">{subtitle}</p> : null}
                </div>

                <div className="space-y-6">
                    {sections.map((section) => (
                        <article
                            key={`${section.sectionKey || 'section'}-${section.id || section.title}`}
                            className="rounded-xl border border-gray-200 bg-white p-5 lg:p-6 shadow-sm"
                        >
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content || 'Content will be available soon.'}</p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
