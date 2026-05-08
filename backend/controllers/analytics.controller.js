const getLeadAnalytics = (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            totalLeads: 1250,
            conversionRate: 15.4,
            activeSyncs: 8,
            topSources: [
                { source: 'WhatsApp', count: 450 },
                { source: 'Direct Call', count: 320 },
                { source: 'Website', count: 280 }
            ],
            statusDistribution: [
                { status: 'new', count: 120 },
                { status: 'hot', count: 85 },
                { status: 'converted', count: 45 }
            ]
        },
        error: null
    });
};

module.exports = { getLeadAnalytics };
