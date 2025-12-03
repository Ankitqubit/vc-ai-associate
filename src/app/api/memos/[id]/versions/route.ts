import { NextRequest, NextResponse } from 'next/server';
import { getMemoVersions, saveMemoVersion, getMemoByDealId } from '@/lib/data/mock-db';

/**
 * GET /api/memos/[id]/versions
 * Get all versions for a memo
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const memoId = params.id;
    const versions = getMemoVersions(memoId);

    return NextResponse.json({
      success: true,
      versions,
      count: versions.length,
    });
  } catch (error) {
    console.error('Error fetching versions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch versions' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/memos/[id]/versions
 * Create a new version snapshot
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const memoId = params.id;
    const body = await request.json();
    const { changeDescription } = body;

    const success = saveMemoVersion(memoId, changeDescription);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Memo not found' },
        { status: 404 }
      );
    }

    // Return the newly created version
    const versions = getMemoVersions(memoId);
    const latestVersion = versions[versions.length - 1];

    return NextResponse.json({
      success: true,
      version: latestVersion,
      message: 'Version created successfully',
    });
  } catch (error) {
    console.error('Error creating version:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create version' },
      { status: 500 }
    );
  }
}
