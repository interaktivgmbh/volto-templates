import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVocabulary } from '@plone/volto/actions/vocabularies/vocabularies';

import { TEMPLATE_TYPES_VOCABULARY } from '../constants/Vocabularies';

/**
 * Content types a template can be released for (types with blocks),
 * provided by the backend vocabulary.
 *
 * @returns {string[]} portal type ids
 */
export default function useTemplateTypes() {
  const dispatch = useDispatch();
  const vocabulary = useSelector(
    (state) => state.vocabularies?.[TEMPLATE_TYPES_VOCABULARY],
  );

  useEffect(() => {
    if (!vocabulary?.loaded && !vocabulary?.loading) {
      dispatch(
        getVocabulary({ vocabNameOrURL: TEMPLATE_TYPES_VOCABULARY, size: -1 }),
      );
    }
  }, [vocabulary?.loaded, vocabulary?.loading, dispatch]);

  const items = vocabulary?.items;
  return useMemo(() => (items || []).map((item) => item.value), [items]);
}
