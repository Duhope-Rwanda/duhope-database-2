import { FC } from 'react'
import { PageTitle } from '../../../_powr/layout/core'
import { BuilderPage } from './BuilderPage'

const BuilderPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Layout Builder</PageTitle>
      <BuilderPage />
    </>
  )
}

export default BuilderPageWrapper
