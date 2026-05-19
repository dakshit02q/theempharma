import { desc, asc, eq } from 'drizzle-orm';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import PdfViewer from '@/components/PdfViewer';
import PageHero from '@/components/PageHero';
import { db } from '@/lib/db';
import { approvals } from '@/lib/db/schema';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return {
        title: 'Approvals - Theem College of Pharmacy',
        description: 'View institutional approvals and official certificates published by Theem College of Pharmacy and Research.',
        openGraph: generateOGMetadata('approvals', {
            title: 'Approvals - Theem College of Pharmacy',
            description: 'View institutional approvals and official certificates.',
            path: '/approvals',
        }),
        twitter: generateTwitterMetadata('approvals', {
            title: 'Approvals - Theem College of Pharmacy',
            description: 'View institutional approvals and official certificates.',
        }),
        alternates: {
            canonical: 'https://theempharmacy.edu/approvals',
        },
    };
}

async function getApprovalsData() {
    try {
        return await db.select().from(approvals)
            .where(eq(approvals.isActive, true))
            .orderBy(desc(approvals.approvalDate), asc(approvals.id));
    } catch (error) {
        console.error('Error fetching approvals page data:', error);
        return [];
    }
}

export default async function ApprovalsPage() {
    const items = await getApprovalsData();

    return (
        <>
            <main className="bg-[#f8fafc] min-h-screen pb-20">
                <PageHero 
                    title="Approvals & Recognition" 
                    subtitle="Official institutional approvals, certificates, and regulatory recognitions from governing bodies."
                />

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-60px] relative z-20">
                    {items.length === 0 ? (
                        <div className="bg-white rounded-3xl shadow-xl p-16 text-center border border-gray-100">
                            <i className="fas fa-certificate text-5xl text-gray-200 mb-6"></i>
                            <h3 className="text-xl font-black text-[var(--brand-primary)]">No approval documents found.</h3>
                            <p className="text-gray-500 mt-2 font-medium">Official certification documents will be uploaded shortly.</p>
                        </div>
                    ) : (
                        <div className="grid gap-12 md:grid-cols-2">
                            {items.map((item, index) => (
                                <article 
                                    key={item.id} 
                                    className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border-t-8 border-[var(--bcp-teal)] overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col"
                                >
                                    <div className="p-8 lg:p-10 flex-grow">
                                        <div className="flex items-start justify-between mb-8">
                                            <div>
                                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-6">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Certificate</span>
                                                </div>
                                                <h2 className="text-2xl lg:text-3xl font-black text-[var(--brand-primary)] tracking-tight leading-tight">{item.title}</h2>
                                            </div>
                                            <div className="w-14 h-14 rounded-2xl bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)] group-hover:scale-110 transition-transform">
                                                <i className="fas fa-file-contract text-xl"></i>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-600 leading-relaxed font-medium mb-8">{item.description || 'Institutional approval document validating compliance and excellence.'}</p>

                                        <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Approving Body</p>
                                                <p className="font-bold text-[var(--brand-primary)]">{item.approvingBody || 'N/A'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Category</p>
                                                <p className="font-bold text-[var(--brand-primary)]">{item.category || 'N/A'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Recognition Date</p>
                                                <p className="font-bold text-[var(--brand-primary)]">{item.approvalDate || 'N/A'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Certificate No.</p>
                                                <p className="font-bold text-[var(--brand-primary)]">{item.certificateNumber || 'N/A'}</p>
                                            </div>
                                        </div>

                                        {item.document && (
                                            <div className="rounded-2xl overflow-hidden shadow-inner border border-gray-100">
                                                <PdfViewer src={item.document} title={`${item.title || 'Approval'} PDF`} heightClass="h-[40vh]" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {item.document && (
                                        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Official Document</span>
                                            <a 
                                                href={item.document} 
                                                download 
                                                className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)] hover:text-[var(--bcp-teal)] flex items-center gap-2"
                                            >
                                                Download PDF <i className="fas fa-download text-[8px]"></i>
                                            </a>
                                        </div>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--brand-primary-soft)] skew-x-[-12deg] translate-x-32 z-0 opacity-30"></div>
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23223975' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                </div>
            </main>
            <ScrollToTopButton />
        </>
    );
}
