const RecommendationSource = ({ api, weightConfig }) => {
    return (
        <div className="recommendation-source">
            {api && weightConfig ? (
                <p>
                    <strong>Recommendation By:</strong> {api} <br />
                    <strong>Weights:</strong> CBF {weightConfig.cbfWeight}, CF {weightConfig.cfWeight}
                </p>
            ) : (
                <p>No recommendation source selected.</p>
            )}
        </div>
    );
};

export default RecommendationSource;
