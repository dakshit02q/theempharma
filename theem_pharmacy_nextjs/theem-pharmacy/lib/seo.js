// SEO Configuration for Theem Pharmacy Website

const siteConfig = {
    name: 'THEEM - Theem College of Pharmacy and Research',
    shortName: 'THEEM Pharmacy',
    description: 'Premier institution for pharmaceutical education in Boisar. Excellence in pharmaceutical education, research, and healthcare innovation.',
    url: 'https://theempharmacy.edu',
    ogImage: '/images/og-image.jpg',
    creator: 'Theem College of Pharmacy',
    keywords: [
        'pharmacy college',
        'pharmaceutical education',
        'B.Pharmacy',
        'M.Pharmacy',
        'Pharm.D',
        'pharmacy courses',
        'pharmaceutical research',
        'healthcare education',
        'pharmacy admission',
        'medical college',
        'Boisar pharmacy college',
        'Maharashtra pharmacy college',
        'pharmacy degree',
        'pharmaceutical sciences',
        'clinical pharmacy',
        'drug development',
        'pharmaceutical chemistry',
        'pharmacology',
        'pharmacognosy',
        'pharmaceutical analysis'
    ],
    authors: [
        {
            name: 'Theem College of Pharmacy',
            url: 'https://theempharmacy.edu',
        }
    ],
    contact: {
        email: 'info@theempharmacy.edu',
        phone: '+91-2525-123456',
        address: 'Theem College of Pharmacy, Boisar, Maharashtra, India'
    },
    social: {
        twitter: '@theempharmacy',
        facebook: 'theempharmacy',
        instagram: 'theempharmacy',
        linkedin: 'theem-college-pharmacy',
        youtube: 'theempharmacy'
    }
};

// Generate structured data for different page types
const generateStructuredData = (type, data = {}) => {
    const baseStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'CollegeOrUniversity',
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/images/logo.png`,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Theem College of Pharmacy',
            addressLocality: 'Boisar',
            addressRegion: 'Maharashtra',
            addressCountry: 'India'
        },
        sameAs: [
            `https://facebook.com/${siteConfig.social.facebook}`,
            `https://twitter.com/${siteConfig.social.twitter}`,
            `https://instagram.com/${siteConfig.social.instagram}`,
            `https://linkedin.com/company/${siteConfig.social.linkedin}`,
            `https://youtube.com/c/${siteConfig.social.youtube}`
        ]
    };

    switch (type) {
        case 'course':
            return {
                '@context': 'https://schema.org',
                '@type': 'Course',
                name: data.name || '',
                description: data.description || '',
                provider: {
                    '@type': 'CollegeOrUniversity',
                    name: siteConfig.name,
                    url: siteConfig.url
                },
                educationalCredentialAwarded: data.name || '',
                timeRequired: data.duration || '',
                ...data.additionalProperties
            };

        case 'faculty':
            return {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: data.name || '',
                jobTitle: data.position || '',
                email: data.email || '',
                telephone: data.phone || '',
                worksFor: {
                    '@type': 'CollegeOrUniversity',
                    name: siteConfig.name
                },
                description: data.bio || '',
                knowsAbout: data.specialization || ''
            };

        case 'organization':
        default:
            return baseStructuredData;
    }
};

// Generate Open Graph metadata
const generateOGMetadata = (page = 'home', data = {}) => {
    const baseMetadata = {
        title: data.title || siteConfig.name,
        description: data.description || siteConfig.description,
        url: `${siteConfig.url}${data.path || ''}`,
        siteName: siteConfig.name,
        images: [
            {
                url: data.image || siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: data.title || siteConfig.name,
            }
        ],
        locale: 'en_US',
        type: 'website',
    };

    return baseMetadata;
};

// Generate Twitter Card metadata
const generateTwitterMetadata = (page = 'home', data = {}) => {
    return {
        card: 'summary_large_image',
        title: data.title || siteConfig.name,
        description: data.description || siteConfig.description,
        creator: siteConfig.social.twitter,
        site: siteConfig.social.twitter,
        images: [data.image || siteConfig.ogImage],
    };
};

// Generate robots.txt rules
const generateRobotsConfig = () => {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/'],
            },
        ],
        sitemap: `${siteConfig.url}/sitemap.xml`,
    };
};

// Generate sitemap URLs
const generateSitemapUrls = () => {
    const baseUrl = siteConfig.url;
    const currentDate = new Date().toISOString();

    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/courses`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/admissions`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];
};

module.exports = {
    siteConfig,
    generateStructuredData,
    generateOGMetadata,
    generateTwitterMetadata,
    generateRobotsConfig,
    generateSitemapUrls,
};