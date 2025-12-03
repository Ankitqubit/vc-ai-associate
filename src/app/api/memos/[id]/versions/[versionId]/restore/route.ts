import { NextRequest, NextResponse } from 'next/server';
import { restoreMemoVersion } from '@/lib/data/mock-db';

/**
 * POST /api/memos/[id]/versions/[versionId]/restore
 * Restore a previous version
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; versionId: string } }
) {
  try {
    const { id: memoId, versionId } = params;

    const success = restoreMemoVersion(memoId, versionId);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to restore version' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Version restored successfully',
    });
  } catch (error) {
    console.error('Error restoring version:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to restore version' },
      { status: 500 }
    );
  }
}
