const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
    if(!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'))
}

function validVirusFamily(family) {
    const hasName = typeof family.name == 'string' && family.name.trim() != '';
    const hasGenomeType = family.genome_type === 'ds DNA' || family.genome_type === 'ss DNA' || family.genome_type === 'ds/ss DNA' || family.genome_type === 'ds positive nonsegmented RNA' || family.genome_type === 'ds positive segmented RNA' || family.genome_type === 'ss positive nonsegmented RNA' || family.genome_type === 'ss negative segmented RNA' || family.genome_type === 'ss negative nonsegmented RNA' || family.genome_type === 'ss negative/ambisense nonsegmented RNA'
    const hasGenomeLength = typeof family.genome_length == 'string' && family.genome_length.trim() != '';
    const hasEnvelope = family.enveloped === 'yes' || family.enveloped === 'no';
    const hasHost = typeof family.host == 'string' && family.host.trim() != '';

    return hasName && hasGenomeType && hasGenomeLength && hasEnvelope && hasHost;
}

router.get('/', (req, res) => {

    queries.getAll().then(virusFamilies => {
        res.json(virusFamilies)
    })
})

router.get('/:id', isValidId, (req, res, next) => {

    queries.getOne(req.params.id).then(virusFamily => {
        if(virusFamily) {
            res.json(virusFamily)
        }

        else {
            res.status(404);
            next(new Error('Not Found'));
        }

    })

})

router.post('/', (req, res, next) => {
    if(validVirusFamily(req.body)) {
        queries.create(req.body).then(virusFamilyPost => {
            res.json({virusFamilyPost})
        }) 
    }
    else {
        next(new Error('Invalid Virus Family'));
    }

})

router.put('/:id', isValidId, (req, res, next) => {
    if(validVirusFamily(req.body)) {
        queries.update(req.params.id, req.body).then(arrayOfVirusFamilies => {
            res.json(arrayOfVirusFamilies[0]);
        });
    }
    else {
        res.status(404);
        next(new Error('Not Found'));
    }
});

router.delete('/:id', isValidId, (req, res) => {
    queries.delete(req.params.id).then(() => {
        res.json({ deleted: true})
    });
});

module.exports = router;