class Clip {

    m_sName;
    m_sDescription;
    m_oDetail;  // CDetail class object

    constructor (clip_name) {
        this.m_sName = clip_name;
    }

};


class Detail {
    m_sFileFullName;

};

module.exports.CClip = Clip;
module.exports.CDetail = Detail;